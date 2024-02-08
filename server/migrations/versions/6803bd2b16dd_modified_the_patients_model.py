"""Modified the patients model

Revision ID: 6803bd2b16dd
Revises: 75e4b394a0ff
Create Date: 2024-02-08 14:58:40.308324

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6803bd2b16dd'
down_revision = '75e4b394a0ff'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('patients', schema=None) as batch_op:
        batch_op.add_column(sa.Column('dob', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('blood_group', sa.String(), nullable=False))
        batch_op.drop_column('age')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('patients', schema=None) as batch_op:
        batch_op.add_column(sa.Column('age', sa.INTEGER(), nullable=False))
        batch_op.drop_column('blood_group')
        batch_op.drop_column('dob')

    # ### end Alembic commands ###