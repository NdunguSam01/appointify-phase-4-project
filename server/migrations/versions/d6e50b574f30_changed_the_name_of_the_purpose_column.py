"""Changed the name of the purpose column

Revision ID: d6e50b574f30
Revises: 11eacc108344
Create Date: 2024-02-09 20:20:48.581176

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd6e50b574f30'
down_revision = '11eacc108344'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('purpose', sa.String(), nullable=False))
        batch_op.drop_column('puprose')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('puprose', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('purpose')

    # ### end Alembic commands ###
